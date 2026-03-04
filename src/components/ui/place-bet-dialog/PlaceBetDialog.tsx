'use client'

import { Button } from "@/components/shadcn/ui/button";
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/shadcn/ui/dialog";
import { Field, FieldGroup } from "@/components/shadcn/ui/field";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import { Bet, Match, Selection } from "@/interfaces";
import { BetRange } from "../bet-range/BetRange";
import { useState } from "react";
import { placeBet } from "@/actions";
import { toast } from "sonner";

interface Props {
    event: Match,
    selection: Selection,
    userCoins: number;
    handleSetOpen: (state: boolean) => void;
}

export function PlaceBetDialog({ event, selection, userCoins, handleSetOpen }: Props) {
    const minValue = 100;
    const [quantity, setQuantity] = useState(100);
    const [gains, setGains] = useState(Math.round(parseFloat(selection.oddsDecimal) * quantity));

    const updateQuantity = (newQuantity: number) => {
        if (newQuantity < minValue) {
            setQuantity(minValue);
            setGains(Math.round(parseFloat(selection.oddsDecimal) * minValue))
            return;
        }

        if (newQuantity > userCoins) {
            setQuantity(userCoins);
            setGains(Math.round(parseFloat(selection.oddsDecimal) * userCoins))
            return;
        }
        setGains(Math.round(parseFloat(selection.oddsDecimal) * newQuantity))
        setQuantity(newQuantity);
    }

    const handleSubmit = async () => {
        const bet: Bet = {
            matchId: event.id,
            prediction: selection.name.toUpperCase(),
            betCoins: quantity,
            betProfits: gains,
            localTeamId: event.home.id,
            awayTeamId: event.away.id,
            winner: null,
            tournamentId: event.leagueId,
        }
        const { ok, message } = await placeBet(bet);

        if (!ok) {
            console.error(message);
            toast.error("Error trying to place bet", {
                description: message,
                position: "bottom-right"
            })
            return;
        }
        toast.success("Your bet has been placed successfully. Good luck!", {
            position: "bottom-right"
        })
        handleSetOpen(false);

        // TODO: Comprobar userID al hacer placeBet 
    }

    return (
        <DialogContent className="sm:max-w-sm p-0 border-0">
            <DialogHeader className="p-5 bg-[#99D15C] rounded-t-lg">
                <DialogTitle className="text-center font-raleway-black shadow-xs text-2xl text-white">{selection.name === '1' ? event.home.name : selection.name === 'x' ? 'Empate' : event.away.name}</DialogTitle>
                <DialogDescription className="text-center font-raleway-bold shadow-xs text-white">
                    Cuota: {selection.oddsDecimal}
                </DialogDescription>
            </DialogHeader>
            <FieldGroup className="p-5">
                <Label className="flex justify-center items-center gap-1 font-raleway-medium !text-sm text-gray-500">
                    Si ganas obtendrás:
                    <span className="text-[#2bb792] font-raleway-bold">+{gains}</span>
                    Coins
                </Label>
                <Field>
                    <Input id="bet-quantity" min={minValue} minLength={3} className="text-center font-raleway-black !text-2xl" name="bet-quantity-input" defaultValue={minValue} value={quantity} onChange={(value) => updateQuantity(parseInt(value.target.value))} />
                </Field>
                <Field>
                    <BetRange coins={userCoins} updateQuantity={updateQuantity} />
                </Field>
            </FieldGroup>
            <DialogFooter className="p-5">
                <Button type="button" onClick={handleSubmit} className="w-full bg-[#2bb792] hover:bg-[#309d82]">Juega</Button>
            </DialogFooter>
        </DialogContent>
    );
}