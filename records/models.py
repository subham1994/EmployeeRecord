from django.db import models


class Company(models.Model):
	id = models.CharField(max_length=64, primary_key=True)
	name = models.CharField(max_length=30, blank=False)
	created_at = models.DateField(blank=False)

	class Meta:
		verbose_name_plural = "Companies"

	def __repr__(self):
		return '{name}'.format(name=self.name)


class Employee(models.Model):
	employee_id = models.CharField(max_length=64, unique=True)
	first_name = models.CharField(max_length=30, blank=False)
	last_name = models.CharField(max_length=30, blank=False)
	designation = models.CharField(max_length=100, blank=False)
	company = models.ForeignKey(Company, related_name="employees")
	joining_date = models.DateField(blank=False)

	class Meta:
		verbose_name_plural = "Employees"

	def __repr__(self):
		return '{fn} {ln}'.format(fn=self.first_name, ln=self.last_name)
