interface FeatureCardProps {
	title: string;
	description: string;
    icon: any;
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
    return (
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <img src={icon} alt={title} className="w-12 h-12 mb-4"/>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-slate-400">{description}</p>
        </div>
    );
}