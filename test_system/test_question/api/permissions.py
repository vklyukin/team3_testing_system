from rest_framework import permissions


class IsTeacher(permissions.BasePermission):
    """
    Teacher's actions permission
    """

    def has_object_permission(self, request, view, obj):
        if request.user.is_authenticated:
            if request.method in permissions.SAFE_METHODS:
                return True
            return obj.owner == request.user
        return False


class IsStudent(permissions.BasePermission):
    """
    Student's actions permission
    """

    def has_object_permission(self, request, view, obj):
        if request.user.is_authenticated:
            if request.method in permissions.SAFE_METHODS:
                return True
        return False


class IsAdmin(permissions.BasePermission):
    """
    Admin's actions permission
    """

    def has_object_permission(self, request, view, obj):
        if request.user.is_authenticated:
            return obj.owner == request.user
        return False


class EmptyPermission(permissions.BasePermission):
    """
    Anonymous user actions permission
    """

    def has_object_permission(self, request, view, obj):
        return False
