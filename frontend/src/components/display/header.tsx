import { useMutation } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

import { api } from "@/lib/api";
import { Room } from "@/types/Room";

import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Heading } from "../ui/heading";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";

type FieldItem = {
	id: "name" | "jenis" | "status";
	label: string;
};

const field: FieldItem[] = [
	{
		id: "name",
		label: "Name",
	},
	{
		id: "jenis",
		label: "Jenis",
	},
	{
		id: "status",
		label: "Status",
	},
];

export default function HeaderSection() {
	const { toast } = useToast();

	const { mutate: handleCreateRoom } = useMutation<Room, unknown, FormData>({
		mutationFn: (data) => api.post("/room", data),
		onSuccess: () => {
			toast({
				description: "Room successfully created!",
			});
		},
		onError: () => {
			toast({
				description: "Failed to create room!",
			});
		},
	});

	const { register, handleSubmit } = useForm<Room>();

	const onSubmit: SubmitHandler<Room> = (data: Room) => {
		const formData = new FormData();
		for (const key in data) {
			formData.append(key, data[key as keyof Room]);
		}
		handleCreateRoom(formData);
	};

	return (
		<section className="flex justify-between items-center">
			<Heading title="Dashboard Admin" description="Here's a list of rooms data in the company" />
			<Dialog>
				<DialogTrigger asChild>
					<Button>
						<Plus className="mr-2 h-4 w-4" /> Add New Room
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<form onSubmit={handleSubmit(onSubmit)}>
						<DialogHeader>
							<DialogTitle>Add New Room</DialogTitle>
							<DialogDescription>Input the room data here.</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							{field.map((item) => (
								<div key={item.id} className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor={item.id} className="text-right">
										{item.label}
									</Label>
									<Input id={item.id} className="col-span-3" {...register(item.id, { required: true })} />
								</div>
							))}
						</div>
						<DialogFooter>
							<DialogClose asChild>
								<Button type="submit">Add Room</Button>
							</DialogClose>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</section>
	);
}
