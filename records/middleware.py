from django.utils.deprecation import MiddlewareMixin
from django.http import QueryDict


class HttpPostTunnelingMiddleware(MiddlewareMixin):
	def process_request(self, request):
		if 'HTTP_X_HTTP_METHOD_OVERRIDE' in request.META:
			method = request.META['HTTP_X_HTTP_METHOD_OVERRIDE']
			if method.lower() == 'put':
				request.method = 'PUT'
				request.META['REQUEST_METHOD'] = 'PUT'
				request.PUT = QueryDict(request.body)
			if method.lower() == 'delete':
				request.method = 'DELETE'
				request.META['REQUEST_METHOD'] = 'DELETE'
				request.DELETE = QueryDict(request.body)
		return None
