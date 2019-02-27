from rest_framework import permissions


class IsTeacherOrAdmin(permissions.BasePermission):
    """
    Teacher's and Admin's actions permission towards ExamSession object
    """

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            if request.method in permissions.SAFE_METHODS or request.method == 'PUT' or request.method == 'POST':
                return True
        return False

    def has_object_permission(self, request, view, obj):
        if request.user.is_authenticated:
            if request.method in permissions.SAFE_METHODS or request.method == 'PUT' or request.method == 'POST':
                return True
        return False


class IsStudentOrNotAuth(permissions.BasePermission):
    """
    Student's or not authorized user's actions permission towards StudentAnswer object
    """

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            if request.method == 'GET':
                return True
        return False

    def has_object_permission(self, request, view, obj):
        if request.user.is_authenticated:
            if request.method == 'GET':
                return True
        return False
