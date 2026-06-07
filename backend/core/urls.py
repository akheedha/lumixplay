from django.urls import path

from . import views


urlpatterns = [
    path("auth/register/", views.register_user),
    path("auth/login/", views.login_user),
    path("auth/admin-login/", views.admin_login),
    path("auth/me/", views.me),
    path("auth/change-password/", views.change_password),
    path("movies/", views.movies),
    path("movies/<int:movie_id>/", views.movie_detail),
    path("movies/<int:movie_id>/watch/", views.watch_movie),
    path("watchlist/", views.watchlist),
    path("watchlist/<int:movie_id>/", views.watchlist_toggle),
    path("history/", views.history),
    path("admin/dashboard/", views.admin_dashboard),
    path("admin/users/", views.admin_users),
    path("admin/users/<int:user_id>/toggle-block/", views.admin_toggle_user),
    path("admin/users/<int:user_id>/history/", views.admin_user_history),
    path("admin/reports/", views.admin_reports),
]
