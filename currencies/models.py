from django.db import models


class Currency(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    avatar = models.ImageField(upload_to='media/')
    price = models.IntegerField()
    created_time = models.TimeField(auto_now=True)
    updated_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title