from rest_framework import permissions


class IsTeacherOrAdmin(permissions.BasePermission):
    """
    Returns True if user is a teacher or an admin
    """

    def has_object_permission(self, request, view, obj):
        return True
        if request.user.is_authentificated:
            return True
        return False

    def has_permission(self, request, view):
        return True

