from base.models import User


class CommonServices:

    def generate_user(self, instance, is_admin):
        from common.models import Buyer, Supplier

        name = getattr(instance, "name")
        email = getattr(instance, "email")
        is_buyer = isinstance(instance, Buyer)
        is_supplier = isinstance(instance, Supplier)

        user, created = User.objects.update_or_create(
            email=email,
            defaults={
                "username": name,
                "is_staff": True,
                "is_buyer": is_buyer,
                "is_supplier": is_supplier,
                "is_manager": is_admin,
            },
        )

        if created:
            password = User.objects.make_random_password(length=10)
            user.set_password(password)
            user.save()

        # task to send email to buyer

        return user
