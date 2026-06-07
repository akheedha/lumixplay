from django.contrib import admin

from .models import Movie, ViewHistory, WatchlistItem


admin.site.register(Movie)
admin.site.register(ViewHistory)
admin.site.register(WatchlistItem)
