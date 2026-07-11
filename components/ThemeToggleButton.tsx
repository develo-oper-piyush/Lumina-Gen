"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export function ThemeToggleButton() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	const isDark = theme === "dark";

	return (
		<Button
			type="button"
			variant="outline"
			size="icon"
			onClick={() => setTheme(isDark ? "light" : "dark")}
			className="fixed right-1 top-5 z-50 rounded-full border-border/60 bg-background/70 backdrop-blur-sm"
			aria-label="Toggle color theme"
			title={isDark ? "Switch to light mode" : "Switch to dark mode"}
		>
			{isDark ? <Sun size={18} /> : <Moon size={18} />}
		</Button>
	);
}
