import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./dialog";
import { Button } from "./button";

interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function DeleteConfirmModal({
    isOpen,
    onClose,
    onConfirm,
}: DeleteConfirmModalProps) {
    return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px] bg-zinc-950 text-zinc-50 border-zinc-800">
        <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-red-500">
            ¿Confirmar eliminación?
            </DialogTitle>
            <DialogDescription className="text-zinc-400 pt-2">
            Esta acción no se puede deshacer. La transacción se borrará
            permanentemente de tu gestor financiero.
            </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-4">
            <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="border-zinc-700 hover:bg-zinc-800 text-zinc-300"
            >
            Cancelar
            </Button>

            <Button
            type="button"
            variant="destructive"
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white"
            >
            Eliminar
            </Button>
        </DialogFooter>
        </DialogContent>
    </Dialog>
    );
}
