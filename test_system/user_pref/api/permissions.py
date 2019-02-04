from rest_framework import permissions


class IsOwnerPrefReadOnly(permissions.BasePermission):
    """
    Object-level permission to only allow users to read their preference types.
    They are not able to change it.
    """

    def has_pref_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.user.is_authenticated:
            if request.method in permissions.SAFE_METHODS:
                return True
        return False
