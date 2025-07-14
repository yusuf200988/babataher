from django.db import models


class Currency(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    avatar = models.ImageField(upload_to='media/')
    current_price = models.IntegerField()
    last_price = models.IntegerField()
    created_time = models.DateTimeField(auto_now_add=True)
    updated_time = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'currencies'
        verbose_name = 'Currency'
        verbose_name_plural = 'Currencies'

    def save(self, *args, **kwargs):
        if self.last_price is None:
            self.last_price = self.current_price
            super().save(*args, **kwargs)

    def __str__(self):
        return self.title