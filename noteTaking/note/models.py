from django.db import models

# Create your models here.

class Note(models.Model):

    title = models.CharField('title', max_length= 20, blank=False, null=False) 

    body = models.TextField('body', blank=False, null=False) 

    created_at = models.DateTimeField('Created_at', auto_now_add = True)

    updated_at = models.DateTimeField('Updated_at', auto_now = True) 


    def __str__(self):
        return self.title
