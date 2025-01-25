import { Search } from "lucide-react";

interface HeaderProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onHeaderClick: () => void;
}

export function Header({ searchQuery, onSearchChange, onHeaderClick }: HeaderProps) {
    return (
        <header className="bg-white shadow-sm">
            <div className="container-fluid py-3">
                <div className="row align-items-center">
                    <div className="col">
                        <a href="/" className="h4 mb-0 text-decoration-none" onClick={onHeaderClick}>
                            Social Media
                        </a>
                    </div>
                    <div className="col-md-4">
                        <div className="input-group">
                            <span className="input-group-text bg-white border-end-0">
                                <Search size={20} />
                            </span>
                            <input
                                type="search"
                                className="form-control border-start-0"
                                placeholder="Search posts..."
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
