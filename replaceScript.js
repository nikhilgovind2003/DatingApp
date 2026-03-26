import fs from 'fs';
import path from 'path';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            results.push(file);
        }
    });
    return results;
}

const files = walk('./src').filter(f => f.endsWith('.jsx') || f.endsWith('.js'));
for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // React Toastify Replacement
    content = content.replace(/import\s+.*?from\s+['"]react-toastify['"];?/g, "import { toast } from 'sonner';");
    content = content.replace(/import\s+['"]react-toastify\/dist\/ReactToastify\.css['"];?/g, "");
    content = content.replace(/<ToastContainer[\s\S]*?\/>/g, "");
    
    // Alert Replacement
    if (content.match(/\balert\(/)) {
        content = content.replace(/\balert\(/g, "toast(");
        if (!content.includes("from 'sonner'") && !content.includes('from "sonner"')) {
            content = "import { toast } from 'sonner';\n" + content;
        }
    }

    // Clean up extra toast imports if toast isn't used
    // Wait, sometimes developers alias it or use it differently, but here we just check 'toast' usage.
    let usesToast = content.includes("toast(") || content.includes("toast.");
    if (!usesToast && content.includes("import { toast } from 'sonner';")) {
        content = content.replace(/import\s+\{\s*toast\s*\}\s+from\s+['"]sonner['"];?\n?/g, "");
    }

    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log("Updated", file);
    }
}
