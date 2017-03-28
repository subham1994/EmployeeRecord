import json
from datetime import datetime

from django.core import serializers
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.forms.models import model_to_dict
from django.http import HttpResponse, JsonResponse
from django.views.generic import View

from .models import Employee, Company


class CompaniesListView(View):
	def get(self, request):
		companies_list = Company.objects.all()
		paginator = Paginator(companies_list, 6)
		page = request.GET.get('page', 1)
		try:
			companies = serializers.serialize('json', paginator.page(page).object_list)
		except PageNotAnInteger:
			companies = serializers.serialize('json', paginator.page(1).object_list)
		except EmptyPage:
			companies = serializers.serialize('json', paginator.page(paginator.num_pages).object_list)
		return JsonResponse({
			'companies': companies,
			'hasNextPage': paginator.page(page).has_next(),
			'hasPrevPage': paginator.page(page).has_previous(),
			'numPages': paginator.num_pages,
			'currPage': paginator.page(page).number
		}, status=200)

	def delete(self, request):
		Company.objects.all().delete()
		return JsonResponse({'msg': 'companies list deleted successfully'}, status=200)


class CompanyDetailView(View):
	def post(self, request):
		company_data = json.loads(request.body.decode('utf-8'))
		try:
			company = Company(
				id=company_data.get('id'),
				name=company_data.get('name'),
				created_at=datetime.fromtimestamp(company_data.get('createdAt'))
			)
			company.save()
		except Exception as e:
			return JsonResponse({
				'msg': 'could not create a new entry',
				'reason': e.args
			}, status=500)
		else:
			return JsonResponse(model_to_dict(company), status=201)

	def delete(self, request):
		try:
			company = Company.objects.get(pk=request.DELETE.get('id'))
		except Company.DoesNotExist:
			return JsonResponse({'msg': 'record for company not found with the given id'}, status=404)
		else:
			company.delete()
			return JsonResponse({'msg': 'company record deleted successfully'}, status=200)


class EmployeeDetailView(View):
	def get(self, request):
		try:
			employee = Employee.objects.get(pk=request.GET.get('id'))
		except Employee.DoesNotExist:
			return JsonResponse({'msg': 'record not found for the given employee'}, status=404)
		else:
			return JsonResponse(model_to_dict(employee), status=200)

	def put(self, request):
		employee_data = request.PUT
		try:
			employee = Employee.objects.get(pk=employee_data.get('id'))
		except Employee.DoesNotExist:
			return JsonResponse({'msg': 'record not found for the given employee'}, status=404)
		else:
			employee.first_name = employee_data.get('first_name') or employee.first_name
			employee.last_name = employee_data.get('last_name') or employee.last_name
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
		employee_data = json.loads(request.body.decode('utf-8'))
		try:
			employee = Employee(
				employee_id=employee_data.get('employeeId'),
				first_name=employee_data.get('firstName'),
				last_name=employee_data.get('lastName'),
				designation=employee_data.get('designation'),
				company=Company.objects.get(pk=employee_data.get('companyId')),
				joining_date=datetime.fromtimestamp(employee_data.get('joiningDate'))
			)
			employee.save()
		except Exception as e:
			return JsonResponse({
				'msg': 'could not create a new entry',
				'reason': e.args
			}, status=500)
		else:
			return JsonResponse(model_to_dict(employee), status=201)

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
		if 'company_id' in request.GET:
			pass
		employees = serializers.serialize('json', Employee.objects.all())
		return HttpResponse(content=employees, content_type='application/json', status=200)

	def delete(self, request):
		if 'company_id' in request.DELETE:
			pass
		Employee.objects.all().delete()
		return JsonResponse({'msg': 'Employees list deleted successfully'}, status=200)
