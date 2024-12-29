import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { DotFilledIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useDispatch } from "react-redux"
import { paymentHandler } from "@/State/Wallet/Action"

const TopUpForm = () => {
    const [amount, setAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState("Razorpay");

    const dispatch = useDispatch();

    const handleSubmit = () => {
        console.log(amount, paymentMethod);
        dispatch(paymentHandler({
            jwt: localStorage.getItem("jwt"),
            paymentMethod,
            amount
        }));
    };

    const handlePaymentMethodChange = (value) => {
        setPaymentMethod(value);
    };

    const handleChange = (e) => {
        const newAmount = e.target.value;
        setAmount(newAmount);
        console.log(newAmount, paymentMethod); // Just log the updated amount
    };

    return (
        <div className="pt-10 space-y-4">
            <div>
                <h1 className="pb-1">Enter Amount</h1>
                <Input
                    onChange={handleChange}
                    value={amount}
                    className="py-7 text-lg placeholder:$9999"
                />
            </div>
            <div>
                <h1 className="pb-1">Select Payment Method</h1>
                <RadioGroup
                    onValueChange={handlePaymentMethodChange}
                    className="flex"
                    defaultValue="Razorpay"
                >
                    <div className="flex items-center space-x-2 border p-3 px-5 rounded-md">
                        <RadioGroupItem
                            icon={DotFilledIcon}
                            className="h-9 w-9"
                            value="Razorpay"
                            id="r1"
                        />
                        <Label htmlFor="r1">
                            <div className="bg-white rounded-md px-5 py-2 w-32">
                                <img
                                    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIACoAOAMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAwYHBQQB/8QAKBAAAQQBAwMEAgMAAAAAAAAAAQACAwQRBRIhBhNRIjEyQUJxFBYj/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAIBA//EABoRAQACAwEAAAAAAAAAAAAAAAABEgIRYQP/2gAMAwEAAhEDEQA/ANxRFHDPFNv7MjX7HbHbTnB8IbSIiICIiAiIgrPXNvXYqdep09p5syW5O3PPkYrR8ZdjIyeTj9faqmsdLanejiAoQuhqUwBDNXbIXyTy5lMfqAa+NjW4JBHOMLUUXXH1nHGsInzicrSztkvVlYyAQ6u6GKGdggjFf3DxHAI3uBJ9BL3OdnkcD8VNF/cRLVh/kX5A0Qyd50MDWyEyO7zZBjIDWBoaG4JLsk+L8im/G6ZxYt9U7oKjLeou1CajJbnggjrZrPe7EEfqbgN+YLjk+j3XotWeqY7Mst23PSrwCbvz7IRWbGyE7HgkF25zyHc8AAjHm/bWhxdgbiME45KOa17S17Q4H6Iyl+GnF6Sk1a1pjL2t5imssY5lXA/xbtHy4+Tjlx8ZA+sn4u4imZ3KhERYCIiAiIgIiIP/2Q=="
                                    alt=""
                                />
                            </div>
                        </Label>
                    </div>

                    <div className="flex items-center space-x-2 border p-3 px-5 rounded-md">
                        <RadioGroupItem
                            icon={DotFilledIcon}
                            className="h-9 w-9"
                            value="Stripe"
                            id="r2"
                        />
                        <Label htmlFor="r2">
                            <div className="bg-white rounded-md px-5 w-32">
                                <img
                                    className="h-9"
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAWCAMAAACi/q9qAAAAaVBMVEX///9ncuVfa+RmceVeauRkb+VcaORaZuPMz/Vveebv8Py6vvJWY+OHj+m9wfJqdeWTmuv09f3f4fnq6/tOXOL5+f51f+ewtPCfpe1SYOPR1PbCxvOrsO+Ql+uaoe2nrO+Ciul7hOjX2ves18xlAAABuElEQVQ4jZ2Ui5KrIAyGgRCCiuKl3qttff+HPAntme3sbHt6Ns4wSP5PkhBU6rU1x5i/cb+0YrZz95GyK2pqnkBnTp+BRcDwDF7H5V9In/c8VkbTz/6mf5J+LY8xUMBaQIgxU0MEX57OK0STe4zDEkMYjiT1WSDaH58pHWh+goAaIKoMAdGMqwXKvQOwwOuzZ+klAKA2kMiFtGaJmxPoglUZC004rxx57i3PiVAD9WoJGuPVadwEPBvtuHjtLqDrmkZAM7Zd9QDNqNTG+xRqACx5J6eDJDoajXvKWJQSRJb8qniAruUXq7Hsg7Yyj2Al7m4GjTSsd7B5AW4IWeu4FskkCKUOdJLC7S24I8SD88Vk7nKvqy+5QK5a34BXhEF2LGuxbZXDFbTjUtVvwIbYzzma6uv4q1i0OUeBO4M4dcd3ELe2HUDbVd2QxAmFNdRnggHeSv/V38T5G+N9qxtAh9pAfG3VvEtzFzD+7dExhOFKGeJHWWDPAphOcIk2h0BuWWroTpQpEYUL9p1HfWTQWxzCWxXUupCt9RPAPbK2zsrKUZM64AaVnR/GriBLb4gU2iPwiByMcCKAAAAAElFTkSuQmCC"
                                    alt=""
                                />
                            </div>
                        </Label>
                    </div>
                </RadioGroup>
            </div>

            <Button className="w-full" onClick={handleSubmit}>
                Submit
            </Button>
        </div>
    );
};

export default TopUpForm;
