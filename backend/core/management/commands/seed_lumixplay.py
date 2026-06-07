from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

from core.models import Movie, ViewHistory, WatchlistItem


MOVIES = [
    {
        "title": "Interstellar",
        "description": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        "genre": "Sci-Fi",
        "release_year": 2014,
        "thumbnail_url": "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        "video_url": "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
        "title": "The Batman",
        "description": "Batman ventures into Gotham's underworld when a sadistic killer leaves behind cryptic clues.",
        "genre": "Action",
        "release_year": 2022,
        "thumbnail_url": "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
        "video_url": "https://www.w3schools.com/html/movie.mp4",
    },
    {
        "title": "Joker",
        "description": "A failed comedian descends into chaos and becomes an infamous figure in Gotham City.",
        "genre": "Drama",
        "release_year": 2019,
        "thumbnail_url": "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
        "video_url": "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
        "title": "Avengers: Endgame",
        "description": "The remaining Avengers assemble for a final stand to reverse Thanos' devastating snap.",
        "genre": "Action",
        "release_year": 2019,
        "thumbnail_url": "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
        "video_url": "https://www.w3schools.com/html/movie.mp4",
    },
    {
        "title": "Oppenheimer",
        "description": "The story of J. Robert Oppenheimer and the creation of the atomic bomb during World War II.",
        "genre": "Biography",
        "release_year": 2023,
        "thumbnail_url": "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
        "video_url": "https://www.w3schools.com/html/mov_bbb.mp4",
    },
]


class Command(BaseCommand):
    help = "Seed LumixPlay demo data."

    def handle(self, *args, **options):
        User = get_user_model()
        admin, _ = User.objects.get_or_create(
            username="admin@lumixplay.com",
            defaults={"email": "admin@lumixplay.com", "is_staff": True, "is_superuser": True},
        )
        admin.email = "admin@lumixplay.com"
        admin.is_staff = True
        admin.is_superuser = True
        admin.set_password("admin123")
        admin.save()

        user, _ = User.objects.get_or_create(
            username="user@lumixplay.com",
            defaults={"email": "user@lumixplay.com", "first_name": "Demo", "last_name": "User"},
        )
        user.email = "user@lumixplay.com"
        user.first_name = "Demo"
        user.last_name = "User"
        user.is_active = True
        user.set_password("user123")
        user.save()

        created_movies = []
        for item in MOVIES:
            movie, _ = Movie.objects.update_or_create(title=item["title"], defaults=item)
            created_movies.append(movie)

        for movie in created_movies[:3]:
            WatchlistItem.objects.get_or_create(user=user, movie=movie)
            history, made = ViewHistory.objects.get_or_create(user=user, movie=movie)
            if made:
                history.view_count = 2 if movie.title == "Interstellar" else 1
                history.save(update_fields=["view_count"])

        self.stdout.write(self.style.SUCCESS("Seeded LumixPlay demo data."))
        self.stdout.write("Admin: admin@lumixplay.com / admin123")
        self.stdout.write("User: user@lumixplay.com / user123")
