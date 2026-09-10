type Props = {
    title: string;
    value: string;
    helper?: string;
};

export function StatCard({ title, value, helper }: Props) {
    return (
        <div className="border border-white/10 bg-[#121214] rounded-2xl p-5">
            <p className="text-sm text-zinc-400">{title}</p>
            <p className="mt-2 text-3xl font-bold">{value}</p>

            {helper && (
                <p className="mt-1 text-xs text-lime-400">{helper}</p>
            )}
        </div>
    );
}