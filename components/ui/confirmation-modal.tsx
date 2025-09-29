"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AlertTriangle, Package, Phone, FileText, DollarSign, Calendar, MapPin, User } from "lucide-react"

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  type: "package" | "bill" | "topup"
  data: any
  isLoading?: boolean
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  type,
  data,
  isLoading = false,
}: ConfirmationModalProps) {
  const getIcon = () => {
    switch (type) {
      case "package":
        return <Package className="h-6 w-6 text-blue-500" />
      case "bill":
        return <FileText className="h-6 w-6 text-green-500" />
      case "topup":
        return <Phone className="h-6 w-6 text-purple-500" />
    }
  }

  const getTitle = () => {
    switch (type) {
      case "package":
        return "Confirm Package Purchase"
      case "bill":
        return "Confirm Bill Payment"
      case "topup":
        return "Confirm TopUp"
    }
  }

  const getDescription = () => {
    switch (type) {
      case "package":
        return "Please review your package selection before proceeding with the purchase."
      case "bill":
        return "Please review your payment details before proceeding with the bill payment."
      case "topup":
        return "Please review your topup details before proceeding with the recharge."
    }
  }

  const renderPackageDetails = () => {
    if (!data) return null

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">Package:</span>
          <span>{data.packageName}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium">Phone Number:</span>
          <span>+248 {data.phoneNumber}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium">Account Type:</span>
          <Badge variant={data.numberType === "Prepaid" ? "default" : "secondary"}>{data.numberType}</Badge>
        </div>
        <Separator />
        <div className="grid grid-cols-3 gap-4 text-center py-2">
          <div>
            <p className="text-sm font-medium">{data.data}</p>
            <p className="text-xs text-gray-500">Data</p>
          </div>
          <div>
            <p className="text-sm font-medium">{data.voice}</p>
            <p className="text-xs text-gray-500">Voice</p>
          </div>
          <div>
            <p className="text-sm font-medium">{data.sms}</p>
            <p className="text-xs text-gray-500">SMS</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium">Validity:</span>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {data.validity}
          </span>
        </div>
      </div>
    )
  }

  const renderBillDetails = () => {
    if (!data) return null

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">Customer:</span>
          <span className="flex items-center gap-1">
            <User className="h-4 w-4" />
            {data.customerName}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium">Account Number:</span>
          <span>{data.accountNumber}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium">Service Address:</span>
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {data.serviceAddress}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium">Plan:</span>
          <span>{data.planType}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium">Due Date:</span>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(data.dueDate).toLocaleDateString()}
          </span>
        </div>
        {data.status === "overdue" && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 p-2 rounded">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm">This bill is overdue</span>
          </div>
        )}
      </div>
    )
  }

  const renderTopupDetails = () => {
    if (!data) return null

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">Mobile Number:</span>
          <span>+248 {data.phoneNumber}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium">Recharge Amount:</span>
          <span>SR {data.amount}</span>
        </div>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getIcon()}
            {getTitle()}
          </DialogTitle>
          <DialogDescription>{getDescription()}</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {type === "package" && renderPackageDetails()}
          {type === "bill" && renderBillDetails()}
          {type === "topup" && renderTopupDetails()}

          <Separator className="my-4" />

          <div className="flex items-center justify-between text-lg font-bold">
            <span>Total Amount:</span>
            <span className="text-blue-600 flex items-center gap-1">
              <DollarSign className="h-5 w-5" />
              SR {data ? data.amount || data.price : 0}
            </span>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={isLoading}>
            {isLoading ? "Processing..." : "Confirm & Pay"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
