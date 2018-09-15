import uuid
from django.db import models
from django.utils.translation import gettext_lazy as _
from authentication.models import Participant


class ChatRoom(models.Model):

    id = models.UUIDField(
        primary_key=True,
        null=False,
        default=uuid.uuid4,
        editable=False
    )
    name = models.CharField(
        max_length=23,
        blank=False,
        null=False
    )
    password = models.CharField(_('password'), max_length=128)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
                           

class Message(models.Model):

    id = models.UUIDField(
        primary_key=True,
        null=False,
        default=uuid.uuid4,
        editable=False
    )
    author = models.ForeignKey(
        Participant,
        blank=False,
        null=False,
        related_name='own_messages',
        on_delete=models.CASCADE
    )
    chat = models.ForeignKey(
        ChatRoom,
        blank=False,
        null=False,
        related_name='chatroom_messages',
        on_delete=models.CASCADE
    )
    content = models.TextField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)