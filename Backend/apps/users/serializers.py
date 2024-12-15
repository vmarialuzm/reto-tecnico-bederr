from rest_framework import serializers
from .models import *

class RegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={"input_type": "password"}, write_only=True)
    role = serializers.ChoiceField(choices=User.ROLE_CHOICES, default='tesoreria', required=False)
    
    class Meta:
        model = User
        fields = ['email', 'password', 'password2', 'role']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self):
        email = self.validated_data['email']
        password = self.validated_data['password']
        password2 = self.validated_data['password2']
        role = self.validated_data.get('role', 'tesoreria')

        if password != password2:
            raise serializers.ValidationError({'password': 'Passwords must match.'})

        user = User(email=email, role=role)
        user.set_password(password)
        user.save()
        return user
    

class PasswordChangeSerializer(serializers.Serializer):
    current_password = serializers.CharField(style={"input_type": "password"}, required=True)
    new_password = serializers.CharField(style={"input_type": "password"}, required=True)

    def validate_current_password(self, value):
        if not self.context['request'].user.check_password(value):
            raise serializers.ValidationError({'current_password': 'Does not match'})
        return value
        

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'role')
