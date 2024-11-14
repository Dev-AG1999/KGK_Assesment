// src/components/PluginManager.js
import dynamic from 'next/dynamic';

export default function PluginManager({ plugins }) {
  return (
    <div>
      {plugins.map((PluginComponent, idx) => (
        <PluginComponent key={idx} />
      ))}
    </div>
  );
}
