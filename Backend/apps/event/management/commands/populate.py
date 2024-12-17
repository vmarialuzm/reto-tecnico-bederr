from django.core.management.base import BaseCommand
from django.utils import timezone
from faker import Faker
import random
from ...models import Event
import os
from django.conf import settings
from django.core.files import File

class Command(BaseCommand):
    help = 'Populate the database with sample Event data'

    def add_arguments(self, parser):
        parser.add_argument(
            '--number',
            type=int,
            default=10,
            help='Indica el número de eventos a crear (por defecto: 10)',
        )
        parser.add_argument(
            '--with-images',
            action='store_true',
            help='Incluye imágenes de portada en los eventos',
        )

    def handle(self, *args, **kwargs):
        number = kwargs['number']
        with_images = kwargs['with_images']
        fake = Faker()

        # Opciones de categoría del modelo
        categories = [choice[0] for choice in Event.OPTIONS_CATEGORY]

        # Ruta a una imagen por defecto (asegúrate de tener esta imagen en tu proyecto)
        default_image_path = os.path.join(settings.BASE_DIR, 'media', 'default_cover.png')

        if with_images and not os.path.exists(default_image_path):
            self.stdout.write(self.style.WARNING(
                f'Imagen por defecto no encontrada en {default_image_path}. Las imágenes no se añadirán.'
            ))
            with_images = False

        for _ in range(number):
            title = fake.sentence(nb_words=6)
            description = fake.paragraph(nb_sentences=5)
            # Generar una fecha futura o pasada
            if random.choice([True, False]):
                # Fecha futura
                date_time = fake.future_datetime(end_date="+30d", tzinfo=timezone.get_current_timezone())
            else:
                # Fecha pasada
                date_time = fake.past_datetime(start_date="-30d", tzinfo=timezone.get_current_timezone())
            place = fake.city() + ", " + fake.country()
            category = random.choice(categories)
            is_virtual = random.choice([True, False])

            event = Event(
                title=title,
                description=description,
                date_time=date_time,
                place=place,
                category=category,
                is_virtual=is_virtual,
            )

            if with_images:
                # Asigna una imagen por defecto
                try:
                    with open(default_image_path, 'rb') as img_file:
                        event.cover_image.save('default_cover.png', File(img_file), save=False)
                except Exception as e:
                    self.stdout.write(self.style.ERROR(f'Error al asignar imagen: {e}'))
            
            event.save()

        self.stdout.write(self.style.SUCCESS(
            f'Se han creado {number} eventos de muestra exitosamente.'
        ))
