# -*- coding: utf-8 -*-
# Generated by Django 1.9.12 on 2017-02-21 18:26


from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('credentials', '0008_auto_20170217_1423'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='programcertificate',
            name='program_id',
        ),
    ]
