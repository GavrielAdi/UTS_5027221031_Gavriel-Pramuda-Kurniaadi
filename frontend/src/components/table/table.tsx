
import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { RoomWithId } from "@/types/Room";

import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { CellAction } from "./cell-action";

const headers = [
	{
		id: 1,
		title: "Profile",
	},
	{
		id: 2,
		title: "Jenis",
	},
	{
		id: 3,
		title: "Status",
	},
];

export default function TableSection() {
	const { data: roomData } = useQuery({
		queryKey: ["room"],
		queryFn: async () => {
			const response = await api.get("/room/");
			return response.data?.rooms;
		},
	});

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						{headers.map((header) => (
							<TableHead key={header.id} className={cn(header.id === 1 ? "px-10 w-[300px]" : "")}>
								{header.title}
							</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{roomData?.map((room: RoomWithId) => (
						<TableRow key={room._id}>
							<TableCell className="flex items-center px-10 py-4">
								<p className="text-sm font-medium leading-none ml-4">{room.name}</p>
							</TableCell>
							<TableCell>{room.jenis}</TableCell>
							<TableCell>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger>
											<Badge>{room.status}</Badge>
										</TooltipTrigger>
										<TooltipContent>
											{room.status === "Terpakai" ? "Terpakai" :  "Tidak terpakai"}
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</TableCell>
							<TableCell>
								<CellAction id={room._id} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
