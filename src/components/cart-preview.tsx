
"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, X, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/cart-context";
import { Input } from "./ui/input";

export function CartPreview() {
    const { cartItems, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open cart preview" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {totalItems > 0 && (
                        <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                            {totalItems}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96" align="end">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">My Cart</h4>
                        <p className="text-sm text-muted-foreground">
                           {totalItems} items in your cart.
                        </p>
                    </div>
                    <div className="grid gap-4">
                       {cartItems.length > 0 ? (
                            <>
                                <div className="max-h-[22rem] overflow-y-auto pr-2 space-y-4">
                                {cartItems.map(item => (
                                    <div key={item.instanceId} className="flex items-start gap-4">
                                        <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                                            <Image src={item.product.imageUrl} alt={item.product.name} fill className="object-cover" data-ai-hint="product image" />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <Link href={`/products/${item.product.id}`} className="text-sm font-medium leading-tight hover:text-primary">{item.product.name}</Link>
                                            <p className="text-sm font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                                             <div className="flex items-center gap-2">
                                                <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.instanceId, -1)}>
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                <Input type="text" value={item.quantity} className="w-12 h-6 text-center" readOnly />
                                                <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.instanceId, 1)}>
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground" onClick={() => removeFromCart(item.instanceId)}>
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                </div>
                                <Separator />
                                <div className="flex justify-between font-semibold">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex gap-2">
                                     <Button asChild className="w-full" variant="outline">
                                        <Link href="/cart">View Cart</Link>
                                    </Button>
                                     <Button asChild className="w-full">
                                        <Link href="/checkout">Checkout</Link>
                                    </Button>
                                </div>
                            </>
                       ) : (
                        <p className="text-sm text-center text-muted-foreground py-4">Your cart is empty.</p>
                       )}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
