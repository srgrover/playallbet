
'use client';

import { Button } from "@/components/shadcn/ui/button";
import {
    Dialog,
    DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { Bet, Selection } from "@/interfaces";
import { Check } from "lucide-react";
import { PlaceBetDialog } from "../place-bet-dialog/PlaceBetDialog";
import { useState } from "react";

interface Props {
    event: any,
    selection: Selection,
    finalized: boolean,
    index: number,
    userCoins: number;
    userBet?: Bet | null
}

export function PlaceBetButton({ event, selection, finalized, index, userCoins, userBet }: Props) {
    console.log({userBet})
    const eventResult: string | null = finalized ? event.home.score > event.away.score ? '1' : event.home.score < event.away.score ? '2' : 'X' : null; 
    const [open, setOpen] = useState(false);

    const handleSetOpen =(state: boolean) => {
        setOpen(state);
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button key={index} variant="outline" size={"lg"} disabled={finalized} className={`w-full flex justify-start ${eventResult && eventResult === selection.name.toUpperCase() ? 'text-green-500!' : ''}`} style={{paddingTop: '30px', paddingBottom: '30px', border: `${eventResult && eventResult === selection.name.toUpperCase() ? '3px solid #99D15C' : ''}`,}}>
                    <div className={`col-span-1 w-full flex justify-between gap-4 text-lg `}>
                        <span className="flex justify-start font-raleway-bold text-gray-500 w-full">
                            <div className="flex justify-around items-center font-raleway-bold text-gray-500 w-10">
                                <span className="rounded-full h-10 w-10 border-2 border-gray-200 flex justify-center items-center">
                                    {
                                        (eventResult && eventResult === selection.name.toUpperCase()) &&
                                        <span className="rounded-full h-10 w-10 border-2 border-[#99D15C] flex justify-center items-center">
                                            <Check size={24} color="#99D15C" />
                                        </span>
                                    }
                                </span>
                            </div>
                            <label className={`flex justify-between items-center py-3 px-4 w-full gap-2 ${!finalized ? 'cursor-pointer' : ''}`}>
                                <span>{selection.name === '1' ? event.home.name : selection.name === 'x' ? 'Empate' : event.away.name}</span>
                                <span>{selection.oddsDecimal}</span>
                            </label>
                        </span>
                    </div>
                </Button>
            </DialogTrigger>
            <PlaceBetDialog event={ event } selection={ selection } userCoins={ userCoins } handleSetOpen={handleSetOpen} />
        </Dialog>
    );
}