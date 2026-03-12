"use client"

import * as React from "react"
import {
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"

import { cn } from "@/lib/utils"

/* ------------------------------------------------ */
/* Chart Config */
/* ------------------------------------------------ */

export type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode
    icon?: React.ComponentType
    color?: string
  }
>

type ChartContextType = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextType | null>(null)

function useChart() {
  const ctx = React.useContext(ChartContext)

  if (!ctx) {
    throw new Error("Chart components must be used inside ChartContainer")
  }

  return ctx
}

/* ------------------------------------------------ */
/* Chart Container */
/* ------------------------------------------------ */

export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    config: ChartConfig
    children: React.ReactNode
  }
>(({ config, children, className, ...props }, ref) => {
  return (
    <ChartContext.Provider value={{ config }}>
      <div
        ref={ref}
        className={cn(
          "flex aspect-video w-full justify-center text-xs",
          className
        )}
        {...props}
      >
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})

ChartContainer.displayName = "ChartContainer"

/* ------------------------------------------------ */
/* Tooltip */
/* ------------------------------------------------ */

export const ChartTooltip = Tooltip

type TooltipItem = {
  dataKey?: string
  name?: string
  value?: number
  color?: string
}

type ChartTooltipContentProps = React.HTMLAttributes<HTMLDivElement> & {
  active?: boolean
  payload?: TooltipItem[]
  label?: string | number
  hideLabel?: boolean
}

export const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  ChartTooltipContentProps
>(({ active, payload = [], label, className, hideLabel }, ref) => {
  const { config } = useChart()

  if (!active || payload.length === 0) return null

  return (
    <div
      ref={ref}
      className={cn(
        "grid min-w-32 gap-1.5 rounded-lg border bg-background px-2.5 py-1.5 text-xs shadow-xl",
        className
      )}
    >
      {!hideLabel && (
        <div className="font-medium">{label}</div>
      )}

      <div className="grid gap-1">
        {payload.map((item, index) => {
          const key = String(item.dataKey ?? "")
          const conf = config[key]

          return (
            <div
              key={index}
              className="flex items-center justify-between gap-2"
            >
              <span className="text-muted-foreground">
                {conf?.label ?? item.name}
              </span>

              <span className="font-mono tabular-nums">
                {item.value?.toLocaleString()}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
})

ChartTooltipContent.displayName = "ChartTooltipContent"

/* ------------------------------------------------ */
/* Legend */
/* ------------------------------------------------ */

export const ChartLegend = Legend

type LegendItem = {
  dataKey?: string
  value?: string
  color?: string
}

type ChartLegendContentProps = React.HTMLAttributes<HTMLDivElement> & {
  payload?: LegendItem[]
  hideIcon?: boolean
}

export const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  ChartLegendContentProps
>(({ payload = [], className, hideIcon }, ref) => {
  const { config } = useChart()

  if (payload.length === 0) return null

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center gap-4 pt-3",
        className
      )}
    >
      {payload.map((item, index) => {
        const key = String(item.dataKey ?? "")
        const conf = config[key]

        return (
          <div
            key={index}
            className="flex items-center gap-1.5"
          >
            {!hideIcon && (
              <div
                className="h-2 w-2 rounded-xs"
                style={{ backgroundColor: item.color }}
              />
            )}

            <span>{conf?.label ?? item.value}</span>
          </div>
        )
      })}
    </div>
  )
})

ChartLegendContent.displayName = "ChartLegendContent"