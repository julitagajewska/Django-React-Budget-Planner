# Generated by Django 4.1.5 on 2023-05-18 17:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='categorytype',
            name='name',
            field=models.CharField(choices=[('incoming', 'Incoming'), ('outgoing', 'Outgoing'), ('wallet', 'wallet')], max_length=50),
        ),
    ]
