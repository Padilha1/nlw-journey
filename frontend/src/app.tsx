import {
	MapPin,
	Calendar,
	ArrowRight,
	UserRoundPlus,
	Settings2,
	X,
	AtSign,
	Plus,
} from "lucide-react";
import { FormEvent, useState } from "react";

export function App() {
	const [isGuestInputOpen, setIsGuestInputOpen] = useState(false);
	const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
	const [emailsToInvite, setEmailsToInvite] = useState([
		"diego@rocketseat.com.br",
		"john@acme.com",
	]);
	function openGuestInput() {
		setIsGuestInputOpen(true);
	}
	function closeGuestInput() {
		setIsGuestInputOpen(false);
	}
	function openGuestsModal() {
		setIsGuestsModalOpen(true);
	}

	function closeGuestsModal() {
		setIsGuestsModalOpen(false);
	}

	function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const data = new FormData(event.currentTarget);
		const email = data.get("email")?.toString();

		if (!email) {
			return;
		}

		if (emailsToInvite.includes(email)) {
			return;
		}

		setEmailsToInvite([...emailsToInvite, email]);

		event.currentTarget.reset();
	}

	function removeEmailFromInvites(emailToRemove: string) {
		const newEmailList = emailsToInvite.filter(
			(email) => email !== emailToRemove
		);

		setEmailsToInvite(newEmailList);
	}

	return (
		<div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
			<div className="max-w-3xl w-full px-6 text-center space-y-10">
				<div className="flex flex-col items-center gap-3">
					<img src="/logo.svg" alt="plann.er" />
					<p className="text-zinc-300 text-lg">
						Convide seus amigos e planeje sua próxima viagem!
					</p>
				</div>
				{/* Input 1 */}
				<div className="space-y-4">
					<div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape">
						<div className="flex items-center gap-2 flex-1">
							<MapPin className="size-5 text-zinc-400" />
							<input
								type="text"
								disabled={isGuestInputOpen}
								className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
								placeholder="Para onde voce vai?"
							/>
						</div>
						<div className="flex items-center gap-2">
							<Calendar className="size-5 text-zinc-400" />
							<input
								type="text"
								disabled={isGuestInputOpen}
								className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none"
								placeholder="Quando?"
							/>
						</div>

						<div className="w-px bg-zinc-800" />

						{isGuestInputOpen ? (
							<button
								onClick={closeGuestInput}
								className="bg-zinc-800 rounded-lg text-zinc-200 py-2 px-5 font-medium flex items-center gap-2 hover:bg-zinc-600 duration-150 "
							>
								Alterar local/data
								<Settings2 className="size-5" />
							</button>
						) : (
							<button
								onClick={openGuestInput}
								className="bg-purple-300 rounded-lg text-purple-950 py-2 px-5 font-medium flex items-center gap-2 hover:bg-purple-600 duration-150 hover:text-purple-200"
							>
								{" "}
								Continuar
								<ArrowRight className="size-5" />
							</button>
						)}
					</div>
					{/* Input 2 */}
					{isGuestInputOpen && (
						<div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape">
							<button
								type="button"
								onClick={openGuestsModal}
								className="flex items-center gap-2 flex-1 text-left"
							>
								<UserRoundPlus className="size-5 text-zinc-400" />
								<span className="text-zinc-400 text-lg flex-1">
									Quem estará na viagem?
								</span>
							</button>

							<div className="w-px bg-zinc-800" />

							<button className="bg-purple-300 rounded-lg text-purple-950 py-2 px-5 font-medium flex items-center gap-2 hover:bg-purple-600 duration-150 hover:text-purple-200">
								{" "}
								Confirmar Viagem
								<ArrowRight className="size-5" />
							</button>
						</div>
					)}
				</div>

				<p className="text-zinc-500 text-small">
					Ao planejar sua viagem pela plann.er você automaticamente concorda{" "}
					<br />
					com nossos{" "}
					<a href="#" className="text-zinc-300 underline">
						termos de uso
					</a>{" "}
					e{" "}
					<a href="#" className="text-zinc-300 underline">
						políticas de privacidade
					</a>
					.
				</p>
			</div>

			{/* Modal */}

			{isGuestsModalOpen && (
				<div className="fixed inset-0 bg-black/60 flex items-center justify-center">
					<div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<h2 className="font-lg font-semibold">Selecionar convidados</h2>
								<button>
									<X
										className="size-5 text-zinc-400"
										onClick={closeGuestsModal}
									/>
								</button>
							</div>

							<p className="text-sm text-zinc-400">
								Os convidados irão receber e-mails para confirmar a participação
								na viagem.
							</p>
						</div>

						<div className="flex flex-wrap gap-2">
							{emailsToInvite.map((email) => {
								return (
									<div
										key={email}
										className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
									>
										<span className="text-zinc-300">{email}</span>
										<button type="button">
											<X
												onClick={() => removeEmailFromInvites(email)}
												className="size-4 text-zinc-400"
											/>
										</button>
									</div>
								);
							})}
						</div>

						<div className="w-full h-px bg-zinc-800" />
						<form
							onSubmit={addNewEmailToInvite}
							className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2"
						>
							<div className="px-2 flex items-center flex-1 gap-2">
								<AtSign className="text-zinc-400 size-5" />
								<input
									type="email"
									name="email"
									placeholder="Digite o email do convidado"
									className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
								/>
							</div>

							<button
								type="submit"
								className="bg-purple-300 rounded-lg text-purple-950 py-2 px-5 font-medium flex items-center gap-2 hover:bg-purple-600 duration-150 hover:text-purple-200"
							>
								Convidar
								<Plus className="size-5" />
							</button>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
