from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json
from .models import Participant
from .models import Message, ChatRoom


class ChatConsumer(WebsocketConsumer):

    def init_chat(self, data):
        username = data['username']
        chatroom_id = data.get('chatroom', None)
        user = Participant.objects.get_or_create(
            username=username)
        if chatroom_id:
            chatroom = ChatRoom.objects.filter(
                id=chatroom_id)
        else:
            chatroom = ChatRoom.objects.get_or_create(
                name=username+"'s-room"
            )
        content = {
            'command': 'init_chat'
        }
        if not user:
            content['error'] = 'Unable to get or create User with username: '\
                + username
            self.send_message(content)
        content['success'] = 'Chat init success with username:{} in room {} '\
            .format(user[0].username, chatroom[0].name)
        content['data'] = {
            'username': user[0].username,
            'chatroom': chatroom[0].name,
            'chatroom_id': str(chatroom[0].id),
        }
        self.send_message(content)

    def fetch_messages(self, data):
        messages = Message.get_chat_messages(data.get('chatroom'))
        content = {
            'command': 'messages',
            'messages': self.messages_to_json(messages)
        }
        self.send_message(content)

    def new_message(self, data):
        author = data['from']
        text = data['message']
        room_id = data['to']
        author_user, chatroom = Participant.objects.get_or_create(
            username=author), ChatRoom.objects.get_or_create(id=room_id)
        message = Message.objects.create(
            author=author_user[0], content=text, chat=chatroom[0])
        content = {
            'command': 'new_message',
            'message': self.message_to_json(message),
            'chat': str(message.chat.id),
            'chat_name': str(message.chat.name),
        }
        self.send_chat_message(content)

    def messages_to_json(self, messages):
        result = []
        for message in messages:
            result.append(self.message_to_json(message))
        return result

    def message_to_json(self, message):
        return {
            'id': str(message.id),
            'author': message.author.username,
            'content': message.content,
            'created_at': str(message.created_at)
        }

    commands = {
        'init_chat': init_chat,
        'fetch_messages': fetch_messages,
        'new_message': new_message
    }

    def connect(self):
        self.chat_name = 'chat'
        self.chat_group_name = 'chat_%s' % self.chat_name

        # Join chat group
        async_to_sync(self.channel_layer.group_add)(
            self.chat_group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        # leave group chat
        async_to_sync(self.channel_layer.group_discard)(
            self.chat_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        data = json.loads(text_data)
        self.commands[data['command']](self, data)

    def send_message(self, message):
        self.send(text_data=json.dumps(message))

    def send_chat_message(self, message):
        # Send message to chat group
        async_to_sync(self.channel_layer.group_send)(
            self.chat_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    # Receive message from chat group
    def chat_message(self, event):
        message = event['message']
        # Send message to WebSocket
        self.send(text_data=json.dumps(message))
