import json

from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.hashers import check_password
from django.core import signing
from django.db.models import Count, Sum
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import Movie, ViewHistory, WatchlistItem


User = get_user_model()
TOKEN_SALT = "lumixplay-api"


def body(request):
    if not request.body:
        return {}
    return json.loads(request.body.decode("utf-8"))


def token_for(user):
    return signing.dumps({"user_id": user.id}, salt=TOKEN_SALT)


def user_payload(user):
    return {
        "id": user.id,
        "name": user.get_full_name() or user.username,
        "email": user.email,
        "is_staff": user.is_staff,
        "is_active": user.is_active,
    }


def movie_payload(movie, user=None):
    data = {
        "id": movie.id,
        "title": movie.title,
        "description": movie.description,
        "genre": movie.genre,
        "release_year": movie.release_year,
        "thumbnail_url": movie.thumbnail_url,
        "video_url": movie.video_url,
        "view_count": ViewHistory.objects.filter(movie=movie).aggregate(total=Sum("view_count"))["total"] or 0,
        "watchlist_count": WatchlistItem.objects.filter(movie=movie).count(),
    }
    if user and user.is_authenticated:
        data["in_watchlist"] = WatchlistItem.objects.filter(user=user, movie=movie).exists()
    return data


def error(message, status=400):
    return JsonResponse({"error": message}, status=status)


def auth_user(request, staff=False):
    header = request.headers.get("Authorization", "")
    if not header.startswith("Token "):
        return None
    try:
        payload = signing.loads(header.removeprefix("Token "), salt=TOKEN_SALT, max_age=60 * 60 * 24 * 7)
        user = User.objects.get(id=payload["user_id"])
    except Exception:
        return None
    if not user.is_active:
        return None
    if staff and not user.is_staff:
        return None
    return user


def require_user(request, staff=False):
    user = auth_user(request, staff=staff)
    if not user:
        return None, error("Authentication required.", status=401)
    return user, None


@csrf_exempt
@require_http_methods(["POST"])
def register_user(request):
    data = body(request)
    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")
    if not email or not password:
        return error("Email and password are required.")
    if User.objects.filter(email=email).exists():
        return error("An account with this email already exists.")
    user = User.objects.create_user(username=email, email=email, password=password)
    if name:
        parts = name.split(" ", 1)
        user.first_name = parts[0]
        user.last_name = parts[1] if len(parts) > 1 else ""
        user.save(update_fields=["first_name", "last_name"])
    return JsonResponse({"token": token_for(user), "user": user_payload(user)}, status=201)


@csrf_exempt
@require_http_methods(["POST"])
def login_user(request):
    data = body(request)
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")
    user = authenticate(username=email, password=password)
    if not user:
        return error("Invalid email or password.", status=401)
    if not user.is_active:
        return error("Your account is blocked. Contact the administrator.", status=403)
    return JsonResponse({"token": token_for(user), "user": user_payload(user)})


@csrf_exempt
@require_http_methods(["POST"])
def admin_login(request):
    data = body(request)
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")
    user = authenticate(username=email, password=password)
    if not user or not user.is_staff:
        return error("Invalid admin credentials.", status=401)
    return JsonResponse({"token": token_for(user), "user": user_payload(user)})


@require_http_methods(["GET"])
def me(request):
    user, failure = require_user(request)
    if failure:
        return failure
    return JsonResponse({"user": user_payload(user)})


@csrf_exempt
@require_http_methods(["POST"])
def change_password(request):
    user, failure = require_user(request)
    if failure:
        return failure
    data = body(request)
    old_password = data.get("old_password", "")
    new_password = data.get("new_password", "")
    if not check_password(old_password, user.password):
        return error("Current password is incorrect.", status=403)
    if len(new_password) < 6:
        return error("New password must be at least 6 characters.")
    user.set_password(new_password)
    user.save(update_fields=["password"])
    return JsonResponse({"message": "Password changed successfully."})


@csrf_exempt
@require_http_methods(["GET", "POST"])
def movies(request):
    user = auth_user(request)
    if request.method == "GET":
        query = request.GET.get("q", "").strip()
        qs = Movie.objects.all()
        if query:
            qs = qs.filter(title__icontains=query)
        return JsonResponse({"movies": [movie_payload(movie, user) for movie in qs]})

    admin, failure = require_user(request, staff=True)
    if failure:
        return failure
    data = body(request)
    movie = Movie.objects.create(
        title=data.get("title", "").strip(),
        description=data.get("description", "").strip(),
        genre=data.get("genre", "").strip(),
        release_year=data.get("release_year") or None,
        thumbnail_url=data.get("thumbnail_url", "").strip(),
        video_url=data.get("video_url", "").strip(),
    )
    if not movie.title or not movie.description:
        movie.delete()
        return error("Title and description are required.")
    return JsonResponse({"movie": movie_payload(movie, admin)}, status=201)


@csrf_exempt
@require_http_methods(["GET", "PUT", "DELETE"])
def movie_detail(request, movie_id):
    movie = Movie.objects.filter(id=movie_id).first()
    if not movie:
        return error("Movie not found.", status=404)
    user = auth_user(request)
    if request.method == "GET":
        return JsonResponse({"movie": movie_payload(movie, user)})

    admin, failure = require_user(request, staff=True)
    if failure:
        return failure
    if request.method == "DELETE":
        movie.delete()
        return JsonResponse({"message": "Movie deleted."})

    data = body(request)
    for field in ["title", "description", "genre", "thumbnail_url", "video_url"]:
        if field in data:
            setattr(movie, field, data[field])
    if "release_year" in data:
        movie.release_year = data["release_year"] or None
    movie.save()
    return JsonResponse({"movie": movie_payload(movie, admin)})


@csrf_exempt
@require_http_methods(["POST"])
def watch_movie(request, movie_id):
    user, failure = require_user(request)
    if failure:
        return failure
    movie = Movie.objects.filter(id=movie_id).first()
    if not movie:
        return error("Movie not found.", status=404)
    history, created = ViewHistory.objects.get_or_create(user=user, movie=movie)
    if not created:
        history.view_count += 1
        history.save(update_fields=["view_count", "watched_at"])
    return JsonResponse({"movie": movie_payload(movie, user)})


@require_http_methods(["GET"])
def watchlist(request):
    user, failure = require_user(request)
    if failure:
        return failure
    items = WatchlistItem.objects.select_related("movie").filter(user=user)
    return JsonResponse({"movies": [movie_payload(item.movie, user) for item in items]})


@csrf_exempt
@require_http_methods(["POST", "DELETE"])
def watchlist_toggle(request, movie_id):
    user, failure = require_user(request)
    if failure:
        return failure
    movie = Movie.objects.filter(id=movie_id).first()
    if not movie:
        return error("Movie not found.", status=404)
    if request.method == "DELETE":
        WatchlistItem.objects.filter(user=user, movie=movie).delete()
        return JsonResponse({"in_watchlist": False})
    WatchlistItem.objects.get_or_create(user=user, movie=movie)
    return JsonResponse({"in_watchlist": True})


@require_http_methods(["GET"])
def history(request):
    user, failure = require_user(request)
    if failure:
        return failure
    rows = ViewHistory.objects.select_related("movie").filter(user=user)
    return JsonResponse(
        {
            "history": [
                {
                    "movie": movie_payload(row.movie, user),
                    "watched_at": row.watched_at,
                    "view_count": row.view_count,
                }
                for row in rows
            ]
        }
    )


@require_http_methods(["GET"])
def admin_dashboard(request):
    _, failure = require_user(request, staff=True)
    if failure:
        return failure
    return JsonResponse(
        {
            "total_movies": Movie.objects.count(),
            "total_users": User.objects.filter(is_staff=False).count(),
            "total_views": ViewHistory.objects.aggregate(total=Sum("view_count"))["total"] or 0,
            "watchlist_adds": WatchlistItem.objects.count(),
        }
    )


@require_http_methods(["GET"])
def admin_users(request):
    _, failure = require_user(request, staff=True)
    if failure:
        return failure
    query = request.GET.get("q", "").strip()
    qs = User.objects.filter(is_staff=False).order_by("first_name", "email")
    if query:
        qs = qs.filter(email__icontains=query) | qs.filter(first_name__icontains=query) | qs.filter(last_name__icontains=query)
    return JsonResponse({"users": [user_payload(user) for user in qs.distinct()]})


@csrf_exempt
@require_http_methods(["POST"])
def admin_toggle_user(request, user_id):
    _, failure = require_user(request, staff=True)
    if failure:
        return failure
    user = User.objects.filter(id=user_id, is_staff=False).first()
    if not user:
        return error("User not found.", status=404)
    user.is_active = not user.is_active
    user.save(update_fields=["is_active"])
    return JsonResponse({"user": user_payload(user)})


@require_http_methods(["GET"])
def admin_user_history(request, user_id):
    _, failure = require_user(request, staff=True)
    if failure:
        return failure
    user = User.objects.filter(id=user_id, is_staff=False).first()
    if not user:
        return error("User not found.", status=404)
    rows = ViewHistory.objects.select_related("movie").filter(user=user)
    return JsonResponse(
        {
            "user": user_payload(user),
            "history": [
                {
                    "movie": movie_payload(row.movie),
                    "watched_at": row.watched_at,
                    "view_count": row.view_count,
                }
                for row in rows
            ],
        }
    )


@require_http_methods(["GET"])
def admin_reports(request):
    _, failure = require_user(request, staff=True)
    if failure:
        return failure
    movies_qs = Movie.objects.annotate(view_total=Sum("viewhistory__view_count"), watchlist_total=Count("watchlistitem")).order_by("-view_total", "title")
    return JsonResponse(
        {
            "total_views": ViewHistory.objects.aggregate(total=Sum("view_count"))["total"] or 0,
            "active_users": User.objects.filter(is_staff=False, is_active=True).count(),
            "movies": [
                {
                    **movie_payload(movie),
                    "view_count": movie.view_total or 0,
                    "watchlist_count": movie.watchlist_total,
                }
                for movie in movies_qs
            ],
        }
    )
