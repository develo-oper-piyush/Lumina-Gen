"use client";

import React from "react";
import { motion } from "motion/react";
import { TESTIMONIAL_COLUMNS } from "@/lib/constants";

// --- Types ---
interface Testimonial {
	text: string;
	image: string;
	name: string;
	role: string;
}

// --- Data ---
const [firstColumn, secondColumn, thirdColumn] = TESTIMONIAL_COLUMNS;

// --- Sub-Components ---
const TestimonialsColumn = (props: {
	className?: string;
	testimonials: Testimonial[];
	duration?: number;
}) => {
	return (
		<div className={props.className}>
			<motion.ul
				animate={{
					translateY: "-50%",
				}}
				transition={{
					duration: props.duration || 10,
					repeat: Infinity,
					ease: "linear",
					repeatType: "loop",
				}}
				className="flex flex-col gap-6 pb-6 bg-transparent transition-colors duration-300 list-none m-0 p-0"
			>
				{[
					...new Array(2).fill(0).map((_, index) => (
						<React.Fragment key={index}>
							{props.testimonials.map(
								({ text, image, name, role }, i) => (
									<motion.li
										key={`${index}-${i}`}
										aria-hidden={
											index === 1 ? "true" : "false"
										}
										tabIndex={index === 1 ? -1 : 0}
										whileHover={{
											scale: 1.03,
											y: -8,
											boxShadow:
												"0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.05)",
											transition: {
												type: "spring",
												stiffness: 400,
												damping: 17,
											},
										}}
										whileFocus={{
											scale: 1.03,
											y: -8,
											boxShadow:
												"0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.05)",
											transition: {
												type: "spring",
												stiffness: 400,
												damping: 17,
											},
										}}
										className="p-10 rounded-3xl border border-border bg-card shadow-lg shadow-black/5 max-w-xs w-full transition-all duration-300 cursor-default select-none group focus:outline-none focus:ring-2 focus:ring-ring"
									>
										<blockquote className="m-0 p-0">
											<p className="text-muted-foreground leading-relaxed font-normal m-0 transition-colors duration-300">
												{text}
											</p>
											<footer className="flex items-center gap-3 mt-6">
												<img
													width={40}
													height={40}
													src={image}
													alt={`Avatar of ${name}`}
													className="h-10 w-10 rounded-full object-cover ring-2 ring-muted group-hover:ring-primary/30 transition-all duration-300 ease-in-out"
												/>
												<div className="flex flex-col">
													<cite className="font-semibold not-italic tracking-tight leading-5 text-foreground transition-colors duration-300">
														{name}
													</cite>
													<span className="text-sm leading-5 tracking-tight text-muted-foreground mt-0.5 transition-colors duration-300">
														{role}
													</span>
												</div>
											</footer>
										</blockquote>
									</motion.li>
								),
							)}
						</React.Fragment>
					)),
				]}
			</motion.ul>
		</div>
	);
};

const TestimonialsSection = () => {
	return (
		<section
			aria-labelledby="testimonials-heading"
			className="bg-background py-24 relative overflow-hidden"
		>
			<motion.div
				initial={{ opacity: 0, y: 50, rotate: -2 }}
				whileInView={{ opacity: 1, y: 0, rotate: 0 }}
				viewport={{ once: true, amount: 0.15 }}
				transition={{
					duration: 1.2,
					ease: [0.16, 1, 0.3, 1],
					opacity: { duration: 0.8 },
				}}
				className="container px-4 z-10 mx-auto"
			>
				<div className="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-16">
					<div className="flex justify-center">
						<div className="border border-border py-1 px-4 rounded-full text-xs font-semibold tracking-wide uppercase text-muted-foreground bg-muted/50 transition-colors">
							Testimonials
						</div>
					</div>

					<h2
						id="testimonials-heading"
						className="text-4xl md:text-5xl font-extrabold tracking-tight mt-6 text-center text-foreground transition-colors"
					>
						What our users say
					</h2>
					<p className="text-center mt-5 text-muted-foreground text-lg leading-relaxed max-w-sm transition-colors">
						Discover how thousands of teams streamline their
						operations with our platform.
					</p>
				</div>

				<div
					className="flex justify-center gap-6 mt-10 mask-[linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[740px] overflow-hidden"
					role="region"
					aria-label="Scrolling Testimonials"
				>
					<TestimonialsColumn
						testimonials={firstColumn}
						duration={15}
					/>
					<TestimonialsColumn
						testimonials={secondColumn}
						className="hidden md:block"
						duration={19}
					/>
					<TestimonialsColumn
						testimonials={thirdColumn}
						className="hidden lg:block"
						duration={17}
					/>
				</div>
			</motion.div>
		</section>
	);
};

export function Testimonials() {
	return <TestimonialsSection />;
}

export default Testimonials;
