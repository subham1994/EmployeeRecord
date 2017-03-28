from django.utils.deprecation import MiddlewareMixin
import json


class HttpPostTunnelingMiddleware(MiddlewareMixin):
	def process_request(self, request):
		if 'HTTP_X_HTTP_METHOD_OVERRIDE' in request.META:
			method = request.META['HTTP_X_HTTP_METHOD_OVERRIDE']
			if method.lower() == 'put':
				request.method = 'PUT'
				request.META['REQUEST_METHOD'] = 'PUT'
				request.PUT = json.loads(request.body.decode('utf-8'))
			if method.lower() == 'delete':
				request.method = 'DELETE'
				request.META['REQUEST_METHOD'] = 'DELETE'
				request.DELETE = json.loads(request.body.decode('utf-8'))
		return None
