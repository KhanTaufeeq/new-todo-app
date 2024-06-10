from django.http import Http404
from django.shortcuts import render
from . serializer import NoteSerializer
from . models import Note
from rest_framework import generics 
from rest_framework.views import APIView
# from rest_framework.filters import SearchFilter
# from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response 
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
# Create your views here.


class ListAllNotes(generics.ListAPIView):

    queryset = Note.objects.all() 
    serializer_class = NoteSerializer 

class CreateNewNote(generics.CreateAPIView):

    serializer_class = NoteSerializer 

class FetchOneNote(generics.RetrieveAPIView):

    queryset = Note.objects.all()
    serializer_class = NoteSerializer 

    def get_object(self):
        id = self.kwargs['id'] 
        return self.get_queryset().get(pk = id) 
    

class UpdateOneNote(generics.UpdateAPIView):

    queryset = Note.objects.all()
    serializer_class = NoteSerializer 

    def put(self, request, pk):
        response = super().put(request, pk)
        return response


class FetchNoteSubString(APIView):

    def get(self, request, format=None):
        substring = request.query_params.get('title', None) 

        if substring:
            notes = Note.objects.filter(title__icontains = substring) 
        else:
            notes = Note.objects.all() 

        serializer = NoteSerializer(notes, many=True)

        return Response(serializer.data , status = status.HTTP_200_OK ) 

    # queryset = Note.objects.all() 
    # serializer = NoteSerializer 
    # search_backends = [SearchFilter]
    # search_field = ['title']

class DeleteTask(APIView):

    allowed_methods = ['DELETE']

    def get_object(self, pk):
        try:
            return Note.objects.get(pk=pk)
        except Note.DoesNotExist:
            raise Http404

    def delete(self, request, pk, format = None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response({'message': 'the task has been deleted successfully'}, status = status.HTTP_204_NO_CONTENT)


