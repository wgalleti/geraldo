from django.utils.translation import gettext_lazy as _

from price.models import Price, PriceStatus


class PriceService:

    def __init__(self, pk=None):
        self.data: Price = Price()
        if pk:
            self.data = Price.objects.get(id=pk)

    def _has_data(self):
        if self.data.pk is None:
            raise Exception(_("Price not persisted"))

    def _get_queryset_items(self):
        return self.data.price_items

    def apply_clean_discount(self):
        self._has_data()

        self.data.discount = 0
        self.data.discount_percent = 0
        self.data.save()

        self._get_queryset_items().update(discount=0, discount_percent=0)

    def apply_discount(self):
        self._has_data()
        if self.data.discount_percent > 0:
            return self._apply_discount_percentage()

        return self._apply_discount_value()

    def _apply_discount_percentage(self):
        self._has_data()

        percentage = self.data.discount_percent
        if percentage == 0:
            return

        # Parameters
        qs_items = self._get_queryset_items()
        count = qs_items.count()
        base_price = self.data.subtotal

        position = 0
        total_discount = 0

        for item in qs_items.all():
            position += 1
            proportional_value = item.subtotal * (percentage / 100)
            value = (
                proportional_value if position != count else base_price - total_discount
            )
            item.discount = value
            item.discount_percent = percentage
            item.save()

            total_discount += proportional_value

    def _apply_discount_value(self):
        self._has_data()

        discount = self.data.discount
        if discount == 0:
            return

        qs_items = self._get_queryset_items()
        count = qs_items.count()
        base_price = self.data.subtotal
        total_discount = 0
        position = 0

        for item in qs_items.all():
            position += 1
            if item.subtotal == 0:
                continue

            proportional_value = item.subtotal / base_price * discount
            value = (
                proportional_value if position != count else discount - total_discount
            )
            item.discount = value
            item.save()

            total_discount += proportional_value

    def cancel(self):
        self._has_data()

        self.data.status = PriceStatus.CANCELLED
        self.data.save()

    def finish(self):
        self._has_data()

        self.data.status = PriceStatus.FINISHED
        self.data.save()
