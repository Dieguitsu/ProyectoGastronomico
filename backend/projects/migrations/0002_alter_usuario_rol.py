# Generated by Django 5.1.2 on 2024-11-21 19:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuario',
            name='rol',
            field=models.CharField(choices=[('cliente', 'Cliente'), ('empleado', 'Empleado'), ('admin', 'Administrador'), ('dueño', 'Dueño'), ('chef', 'Chef'), ('jefe de area', 'Jefe de area'), ('cocinero', 'Cocinero')], max_length=20),
        ),
    ]
