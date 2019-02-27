from rest_framework import permissions


class IsNotAuthenticated(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    Assumes the model instance has an `owner` attribute.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        # if request.method in permissions.SAFE_METHODS:
        return True

        # Instance must have an attribute named `owner`.
        return obj.owner == request.user


class IsTeacherOrAdmin(permissions.BasePermission):
    """
    Teacher's and Admin's actions permission towards Mark object
    """

    def has_object_permission(self, request, view, obj):
        if request.user.is_authenticated:
                return True
        return False


class EmptyPermission(permissions.BasePermission):
    """
    Anonymous user actions permission towards Mark object
    """

    def has_object_permission(self, request, view, obj):
        return False
