import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ForgotPasswordForm = () => {
    const form = useForm({
        resolver: "", // Add resolver if needed
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = (data) => {
        console.log(data); // You can replace this with actual logic like API calls
    };

    return (
        <div>
            <h1 className="text-xl font-bold">Forgot Password</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="Enter Your Email"
                                        {...field}
                                        className="border w-full border-gray-700 p-5"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full py-5">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default ForgotPasswordForm;
