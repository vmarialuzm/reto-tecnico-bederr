from apps.users.permissions import IsClient
from rest_framework import generics
from .models import *
from .serializers import *


class EventListCreateView(generics.ListCreateAPIView):
    """
    APIView list and create events.
    """
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    filterset_fields = ['category', 'is_virtual']
    search_fields = ['title', 'place']
    ordering_fields = ['title', 'date_time'] 


class EventRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
    APIView where you can see the details of an event, you can also update and delete it.
    """
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class RegisterToEventView(generics.CreateAPIView):
    """
    APIView where users can register for an event.
    """
    serializer_class = EventRegistrationSerializer
    permission_classes = [IsClient]

    def perform_create(self, serializer):
        user = self.request.user
        event_id = self.request.data.get('event')
        event = Event.objects.get(id=event_id)

        if EventRegistration.objects.filter(user=user, event=event).exists():
            raise serializers.ValidationError("Ya estás inscrito en este evento.")
        
        serializer.save(user=user, event=event)

class UserEventRegistrationView(generics.ListAPIView):
    """
    APIView for users to see the events they are registered.
    """
    serializer_class = EventRegistrationSerializer
    permission_classes = [IsClient]

    def get_queryset(self):
        return EventRegistration.objects.filter(user=self.request.user)
        