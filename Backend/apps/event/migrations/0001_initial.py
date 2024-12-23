# Generated by Django 5.1.4 on 2024-12-15 14:35

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=250)),
                ('description', models.TextField(blank=True, null=True)),
                ('date_time', models.DateTimeField()),
                ('place', models.CharField(max_length=250)),
                ('category', models.CharField(choices=[('CONFERENCE', 'Conference'), ('WORKSHOP', 'Workshop'), ('MEETUP', 'Meetup'), ('WEBINAR', 'Webinar'), ('NETWORKING', 'Networking'), ('PARTY', 'Party'), ('FESTIVAL', 'Festival'), ('EXHIBITION', 'Exhibition')], default='CONFERENCE', max_length=100)),
                ('cover_image', models.ImageField(blank=True, null=True, upload_to='events/images/')),
                ('is_virtual', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ['-date_time'],
            },
        ),
    ]
