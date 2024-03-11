from django.db.models.signals import post_save
from django.dispatch import receiver

from common.models import Buyer, Supplier
from common.services import CommonServices


@receiver(post_save, sender=Buyer)
def buyer_post_save(sender, instance, created, **kwargs):
    cs = CommonServices()
    cs.generate_user(instance, False)


@receiver(post_save, sender=Supplier)
def supplier_post_save(sender, instance, created, **kwargs):
    cs = CommonServices()
    cs.generate_user(instance, False)
