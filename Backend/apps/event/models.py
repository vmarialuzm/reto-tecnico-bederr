from django.db import models
from django.utils.timezone import now
from apps.users.models import User

class Event(models.Model):
    OPTIONS_CATEGORY = [
        ('CONFERENCE', 'Conference'),
        ('WORKSHOP', 'Workshop'),
        ('MEETUP', 'Meetup'),
        ('WEBINAR', 'Webinar'),
        ('NETWORKING', 'Networking'),
        ('PARTY', 'Party'),
        ('FESTIVAL', 'Festival'),
        ('EXHIBITION', 'Exhibition'),
    ]
    title = models.CharField(max_length=250)
    description = models.TextField(blank=True, null=True)
    date_time = models.DateTimeField()
    place = models.CharField(max_length=250)
    category = models.CharField(max_length=100, choices=OPTIONS_CATEGORY, default='CONFERENCE')
    cover_image = models.ImageField(upload_to='events/images/', blank=True, null=True)
    is_virtual = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def has_passed(self):
        return self.date_time < now()
    
    def short_description(self, length=50):
        if len(self.description) > length:
            return f"{self.description[:length]}..."
        return self.description
    
    def __str__(self):
        return f"{self.title} - {self.date_time.strftime('%Y-%m-%d %H:%M')}"

    class Meta:
        ordering = ['-date_time']



class EventRegistration(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='registrations')
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='registrations')
    registered_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20,
        choices=[('PENDING', 'Pending'), ('CONFIRMED', 'Confirmed'), ('CANCELED', 'Canceled')],
        default='PENDING'
    )

    class Meta:
        unique_together = ('user', 'event')  # Evita duplicados
        verbose_name = "Event Registration"
        verbose_name_plural = "Event Registrations"

    def __str__(self):
        return f"{self.user.username} -> {self.event.title}"