from django.urls import path
from .views import *
urlpatterns = [
    path('', EventListCreateView.as_view(), name='event-list-create'),
    path('<int:pk>/', EventRetrieveUpdateDestroyView.as_view(), name='event-detail'),
    path('register/', RegisterToEventView.as_view(), name='register-to-event'),
    path('my-registrations/', UserEventRegistrationView.as_view(), name='user-registrations'),
]
