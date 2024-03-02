from base.models import User
from common.models import Supplier, Buyer


class CommonGenerateUser:

    def __init__(self, model: [Buyer, Supplier]):
        self.model = model

    def run(self) -> User:
        email = getattr(self.model, "email", None)
        exists_user = User.objects.filter(email=email).exists()
        is_supplier = isinstance(self.model, Supplier)
        is_buyer = not is_supplier
        user = None

        if not exists_user:
            name = self.model.name
            username = name.lower().replace(" ", ".")
            list_name = name.split("")

            data_user = dict(
                username=username,
                email=self.model.email,
                first_name=list_name[0].title(),
                last_name=list_name[-1].title(),
                is_buyer=is_buyer,
                is_supplier=is_supplier,
            )
            user = User.objects.create(**data_user)
            new_password = User.objects.make_random_password()
            user.set_password(new_password)
            # call user task creation

        return user
