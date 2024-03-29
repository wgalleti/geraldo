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
        self.data.refresh_from_db()

    def _get_queryset_items(self):
        return self.data.price_items

    def apply_clean_discount(self):
        self._has_data()

        if not self.data.has_discount:
            return

        self.data.discount = 0
        self.data.discount_percent = 0
        self.data.save()

        self._get_queryset_items().update(discount=0, discount_percent=0)

    def apply_discount(self):
        self._has_data()

        return self._apply_discount_value()

    def apply_discount_from_items(self):
        self._has_data()
        self.data.discount = round(self.data.total_discount, 2)
        self.data.discount_percent = round(
            self.data.total_discount / self.data.value_total * 100, 2
        )
        self.data.save()

    def _apply_discount_value(self):
        self._has_data()

        discount = self.data.discount
        if discount == 0:
            self.apply_clean_discount()

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
            item.discount = round(value, 2)
            item.discount_percent = round(value / item.subtotal * 100, 2)
            item.save()

            total_discount += value

        self.data.discount_percent = round(total_discount / base_price * 100, 2)
        self.data.save()

    def cancel(self):
        self._has_data()

        self.data.status = PriceStatus.CANCELLED
        self.data.save()

    def finish(self):
        self._has_data()

        self.data.status = PriceStatus.FINISHED
        self.data.save()
