# Generated by Django 2.0.7 on 2020-08-05 16:37

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('CompanyManagement', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='ID',
            field=models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True),
        ),
    ]
