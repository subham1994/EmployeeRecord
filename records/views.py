from datetime import datetime

from django.core import serializers
from django.forms.models import model_to_dict
from django.http import HttpResponse, JsonResponse
from django.views.generic import View

from .models import Employee, Company


class CompaniesListView(View):
	def get(self, request):
		companies = serializers.serialize('json', Company.objects.all())
		return HttpResponse(content=companies, content_type='application/json', status=200)

	def delete(self, request):
		Company.objects.all().delete()
		return JsonResponse({'msg': 'companies list deleted successfully'}, status=200)


class CompanyDetailView(View):
	def post(self, request):
		company_data = request.POST
		try:
			company = Company(
				id=company_data.get('id'),
				name=company_data.get('name'),
				created_at=datetime.now()
			)
			company.save()
		except Exception as e:
			return JsonResponse({
				'msg': 'could not create a new entry',
				'reason': e.args
			}, status=500)
		else:
			return JsonResponse(company_data, status=201)

	def delete(self, request):
		try:
			company = Company.objects.get(pk=request.DELETE.get('id'))
		except Company.DoesNotExist:
			return JsonResponse({'msg': 'record for company not found with the given id'}, status=404)
		else:
			company.delete()
			return JsonResponse({'msg': 'company record deleted successfully'}, status=404)


class EmployeeDetailView(View):
	def put(self, request):
		employee_data = request.PUT
		try:
			employee = Employee.objects.get(pk=request.PUT.get('id'))
		except Employee.DoesNotExist:
			return JsonResponse({'msg': 'record not found for the given employee'}, status=404)
		else:
			employee.first_name = employee_data.get('firstName') or employee.first_name
			employee.last_name = employee_data.get('lastName') or employee.last_name
			employee.designation = employee_data.get('designation') or employee.designation
			try:
				employee.save()
			except Exception as e:
				return JsonResponse({
					'msg': 'could not update the record',
					'reason': e.args
				}, status=500)
			else:
				return JsonResponse(model_to_dict(employee), status=200)

	def post(self, request):
		employee_data = request.POST
		try:
			employee = Employee(
				employee_id=employee_data.get('employeeId'),
				first_name=employee_data.get('firstName'),
				last_name=employee_data.get('lastName'),
				designation=employee_data.get('designation'),
				company=Company.objects.get(pk=employee_data.get('companyId')),
				joining_date=datetime.now()
			)
			employee.save()
		except Exception as e:
			return JsonResponse({
				'msg': 'could not create a new entry',
				'reason': e.args
			}, status=500)
		else:
			return JsonResponse(employee_data, status=201)

	def delete(self, request):
		try:
			employee = Employee.objects.get(pk=request.DELETE.get('id'))
		except Employee.DoesNotExist:
			return JsonResponse({'msg': 'record not found for the given employee'}, status=404)
		else:
			employee.delete()
			return JsonResponse({'msg': 'Employee record deleted successfully'}, status=200)


class EmployeesListView(View):
	def get(self, request):
		employees = serializers.serialize('json', Employee.objects.all())
		return HttpResponse(content=employees, content_type='application/json', status=200)

	def delete(self, request):
		Employee.objects.all().delete()
		return JsonResponse({'msg': 'Employees list deleted successfully'}, status=200)
