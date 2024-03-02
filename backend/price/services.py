from django.utils.translation import gettext_lazy as _

from price.models import Price, PriceStatus


class PriceItemService:

    def __init__(self, pk=None):
        self.data = Price()
        if pk:
            self.data = Price.objects.get(id=pk)

    def cancel(self):
        if self.data.pk is None:
            raise Exception(_("Price not persisted"))

        self.data.status = PriceStatus.CANCELLED
        self.data.save()

    def finish(self):
        if self.data.pk is None:
            raise Exception(_("Price not persisted"))

        self.data.status = PriceStatus.FINISHED
        self.data.save()
