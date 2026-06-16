import * as DialogPrimitive from "@radix-ui/react-dialog";
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
        <Dialog
    open={isOpen}
    onOpenChange={(open) => {
        if (!open) onClose();
    }}
>
    <DialogContent
        className="z-[301] bg-zinc-950 text-zinc-50 border-zinc-800"
    >
        <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-red-500">
                ¿Confirmar eliminación?
            </DialogTitle>

            <DialogDescription className="text-zinc-400 pt-2">
                Esta acción no se puede deshacer.
            </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-4">
            <Button
                type="button"
                variant="outline"
                onClick={onClose}
            >
                Cancelar
            </Button>

            <Button
                type="button"
                variant="destructive"
                onClick={onConfirm}
            >
                Eliminar
            </Button>
        </DialogFooter>
    </DialogContent>
</Dialog>
    );
}
